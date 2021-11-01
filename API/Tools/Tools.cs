using Inv.API.Models;
using Inv.API.Tools;
using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


using Microsoft.VisualBasic;

namespace Inv.API.Tools
{
    public class Tools :BaseController
    {
        public enum DateDiffPart
        {
            Day,
            Month,
            Year,
            TotalDays,
            IsMinusDiff,
            IsValidDiff
        }
        public DateTime? GetGDate(string HDate)
        {
            if (string.IsNullOrEmpty(HDate))
                return null;

            string sqlString;
            DateTime GDate = new DateTime();
            string monthStamp = "", lghYear;
            int hDay, counter, hMonth;
            sqlString = @" SELECT start_date, monthstmap, hyear From HIJRA_CONVERT " +
            " WHERE SUBSTRING('" + HDate + "', 7, 4) = hyear";
            var Lst = db.Database.SqlQuery<HIJRA_CONVERT>(sqlString).ToList();
            for (var i = 0; i < Lst.Count; i++)
            {
                GDate = DateTime.Parse(Lst[i].START_DATE.ToString());
                monthStamp = Lst[i].MONTHSTMAP;
                lghYear = Lst[i].HYEAR.ToString();
            }
            counter = 0;
            hMonth = int.Parse(HDate.Substring(3, 2));
            hDay = int.Parse(HDate.Substring(0, 2));
            do
            {
                counter += 1;
                if (counter < hMonth)
                {
                    if (monthStamp.Substring(counter - 1, 1) == "1")
                        hDay = hDay + 30;
                    else
                        hDay = hDay + 29;
                }
            } while (counter < hMonth);
            return GDate.AddDays((double)hDay - 1);
        }

        public string GetHDate(DateTime? GDate)
        {
            if (!GDate.HasValue)
                return "";
            string sqlString;
            string formattedDate = "";
            DateTime lghGDate = new DateTime(); ;
            string monthStamp = "", lghYear = "";
            int counter, ldayh, lmonthh;
            sqlString = "SELECT * FROM dbo.HIJRA_CONVERT WHERE (CONVERT(DATETIME, '" + GDate.Value.ToString("dd/MM/yyyy") + "', 103)>=START_DATE)AND (CONVERT(DATETIME, '" + GDate.Value.ToString("dd/MM/yyyy") + "', 103)-START_DATE)<=360";
            var Lst = db.Database.SqlQuery<HIJRA_CONVERT>(sqlString).ToList();
            for (var i = 0; i < Lst.Count; i++)
            {
                lghGDate = DateTime.Parse(Lst[i].START_DATE.ToString());
                monthStamp = Lst[i].MONTHSTMAP;
                lghYear = Lst[i].HYEAR.ToString();
            }
            //ldayh = (int)DateAndTime.DateDiff(DateInterval.Day, lghGDate, GDate.Value, FirstDayOfWeek.System, FirstWeekOfYear.System) + 1;

            ldayh = (int)DateAndTime.DateDiff(DateInterval.Day, lghGDate, GDate.Value, FirstDayOfWeek.System, FirstWeekOfYear.System) + 1;


            counter = 0;
            lmonthh = 1;
            do
            {
                counter = counter + 1;
                if (monthStamp.Substring(counter - 1, 1) == "1")
                {
                    if (ldayh > 30)
                    {
                        ldayh = ldayh - 30;
                        lmonthh = lmonthh + 1;
                    }
                    else
                    {
                        formattedDate = string.Format(@"{0}/{1}/{2}", ldayh.ToString().PadLeft(2, '0'), lmonthh.ToString().PadLeft(2, '0'), lghYear.ToString().PadLeft(4, '0'));
                        break;
                    }
                }
                else
                {
                    if (ldayh > 29)
                    {
                        ldayh = ldayh - 29;
                        lmonthh = lmonthh + 1;
                    }
                    else
                    {
                        formattedDate = string.Format(@"{0}/{1}/{2}", ldayh.ToString().PadLeft(2, '0'), lmonthh.ToString().PadLeft(2, '0'), lghYear.ToString().PadLeft(4, '0'));
                        break;
                    }
                }
            } while (1 == 1);
            return formattedDate;
        }

        public static string GetFilterdString(string str)
        {
            str = str.Trim();
            str = str.Replace('أ', 'ا');
            str = str.Replace('آ', 'ا');
            str = str.Replace('إ', 'ا');
            str = str.Replace('ة', 'ه');
            string[] names = str.Split(' ');
            str = "";
            for (int i = 0; i < names.Length; i++)
            {
                names[i] = names[i].Trim();
                if (names[i].Length > 0)
                    str += " " + names[i].Trim();
            }
            str = str.Replace("عبد ", "عبد");
            str = str.Replace("ابو ", "ابو");
            return str.Trim();
        }

        //public static string GenerateRandomID()
        //{
        //    return GenerateRandomID("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 10);
        //}

        //public static string GenerateRandomID(string randomStringChars, int length)
        //{
        //    char[] chars = new char[randomStringChars.Length];
        //    chars = randomStringChars.ToCharArray();
        //    RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
        //    byte[] data = new byte[length];
        //    crypto.GetNonZeroBytes(data);
        //    StringBuilder result = new StringBuilder(length);
        //    foreach (byte b in data)
        //    {
        //        result.Append(chars[b % (chars.Length - 1)]);
        //    }
        //    return result.ToString();
        //}

        public DateTime DateGAdd(DateTime dateValue, int days, int months, int years)
        {
            dateValue = dateValue.AddDays(days);
            dateValue = dateValue.AddMonths(months);
            dateValue = dateValue.AddYears(years);
            return dateValue;
        }

        public string DateHAdd(string dateHValue, int addDays, int addMonths, int addYears, bool isMonth30)
        {
            int currentD; int currentM; int currentY;
            string monthStamp = "";
            int monthDays;
            currentD = int.Parse(dateHValue.Substring(0, 2));
            currentM = int.Parse(dateHValue.Substring(3, 2));
            currentY = int.Parse(dateHValue.Substring(6, 4));

            currentY += addYears;
            currentY += Math.Abs(addMonths / 12);
            currentM += Math.Abs(addMonths % 12);

            if (currentM > 12)//if month became 13 , so it should be 1 in next year
            {
                currentM -= 12;
                currentY += 1;
            }

            if (addDays > 0)
            {
                int estimatedMaxYear = Math.Abs((addDays / 30) / 12) + currentY + 2;//get max year to select from hijra table
                string sqlString = string.Format("SELECT * FROM dbo.HIJRA_CONVERT WHERE HYEAR BETWEEN {0} AND {1}", currentY, estimatedMaxYear);
                var Lst = db.Database.SqlQuery<HIJRA_CONVERT>(sqlString).ToList();
                for (var i = 0; i < Lst.Count; i++)
                {
                    monthStamp += Lst[i].MONTHSTMAP;
                }
                if (isMonth30)
                    monthStamp = monthStamp.Replace("0", "1");
                monthStamp = monthStamp.Substring(currentM - 1);//so monthstamp will contain stamps starting with current month stamp

                //after adding years and months if current day 30 and current month in the new year = 29 , so day should be 29
                //ex HDAte = 30/11/1430 add 2 month -> 30/1/1430 if month 1 is 29 days so date should be 29/1/1430
                monthDays = monthStamp.Substring(0, 1) == "1" ? 30 : 29;
                if (monthDays == 29 && currentD == 30)
                    currentD = 29;

                //if  remain days in month > month days go to end day of the month
                if (currentD + addDays > monthDays)
                {
                    addDays -= (monthDays - currentD);
                    currentD = monthDays;
                    int counter = 1;//start with next monthStamp as u went to last day og current month
                    while (addDays > 0)
                    {
                        monthDays = monthStamp.Substring(counter, 1) == "1" ? 30 : 29;
                        if (monthDays < addDays)
                        {
                            addDays -= monthDays;
                            currentD = monthDays;
                        }
                        else
                        {
                            currentD = addDays;
                            addDays = 0;
                        }
                        if (currentM == 12)
                        {
                            currentM = 1;
                            currentY += 1;
                        }
                        else
                            currentM += 1;
                        counter += 1;
                    };
                }
                else
                {
                    currentD += addDays;
                }
            }
            return currentD.ToString().PadLeft(2, '0') + "/" + currentM.ToString().PadLeft(2, '0') + "/" + currentY.ToString();

        }


        public string DateHSubstract(string dateHValue, int substractDays, int substractMonths, int substractYears, bool isMonth30)
        {
            int currentD; int currentM; int currentY;
            string monthStamp = "";
            int monthDays;
            currentD = int.Parse(dateHValue.Substring(0, 2));
            currentM = int.Parse(dateHValue.Substring(3, 2));
            currentY = int.Parse(dateHValue.Substring(6, 4));

            currentY -= substractYears;
            currentY -= Math.Abs(substractMonths / 12);
            currentM -= Math.Abs(substractMonths % 12);

            if (currentM < 1)//if month became less than 0 (ex month is 3 and 5 months is substracted so 3-5 = -2
            {
                currentM += 12;
                currentY -= 1;
            }

            if (substractDays > 0)
            {
                int estimatedMinYear = (currentY - 2) - Math.Abs((substractDays / 30) / 12);//get min year to select from hijra table
                string sqlString = string.Format("SELECT * FROM dbo.HIJRA_CONVERT WHERE HYEAR BETWEEN {0} AND {1}", estimatedMinYear, currentY);
                var Lst = db.Database.SqlQuery<HIJRA_CONVERT>(sqlString).ToList();
                for (var i = 0; i < Lst.Count; i++)
                {
                    monthStamp += Lst[i].MONTHSTMAP;
                }
                if (isMonth30)
                    monthStamp = monthStamp.Replace("0", "1");
                monthStamp = monthStamp.Substring(monthStamp.Length - (monthStamp.Length - currentM));//so monthstamp will contain stamps end with current month stamp

                //after substracting years and months if current day 30 and current month in the new year = 29 , so day should be 29
                //ex HDAte = 30/11/1430 substract 2 month -> 30/9/1430 if month 9 is 29 days so date should be 29/9/1430
                monthDays = monthStamp.Substring(monthStamp.Length - 1, 1) == "1" ? 30 : 29;
                if (monthDays == 29 && currentD == 30)
                    currentD = 29;

                //if  remain days in month > month days go to end day of the month
                if (currentD - substractDays < 1)
                {
                    int counter = 2;//start with previous monthStamp, as last month stamp u get when u checked if last day is 29 or 30 sou want to get previous last stamp
                    while (substractDays > 0)
                    {
                        monthDays = monthStamp.Substring(monthStamp.Length - counter, 1) == "1" ? 30 : 29;
                        if (monthDays < substractDays)
                        {
                            substractDays -= monthDays;
                            currentM -= 1;
                        }
                        else
                        {
                            currentD -= substractDays;
                            substractDays = 0;
                        }

                        if (currentD < 1)
                        {
                            currentM -= 1;
                            monthDays = monthStamp.Substring(monthStamp.Length - (counter + 1), 1) == "1" ? 30 : 29;//get days of month before current month
                            currentD = (monthDays) + currentD; // + multiply - --> -
                        }
                        if (currentM == 0)
                        {
                            currentM = 12;
                            currentY -= 1;
                        }
                        counter += 1;
                    };
                }
                else
                {
                    currentD -= substractDays;
                }
            }
            return currentD.ToString().PadLeft(2, '0') + "/" + currentM.ToString().PadLeft(2, '0') + "/" + currentY.ToString();

        }

        public string DateHSubstract(string dateHValue, int substractDays, int substractMonths, int substractYears)
        {
            return DateHSubstract(dateHValue, substractDays, substractMonths, substractYears, false);
        }

        public string DateHAdd(string dateHValue, int days, int months, int years)
        {
            return DateHAdd(dateHValue, days, months, years, false);
        }

        public int[] DateGDiff(DateTime date1, DateTime date2)
        {
            date1 = new DateTime(date1.Year, date1.Month, date1.Day);
            date2 = new DateTime(date2.Year, date2.Month, date2.Day);
            int[] dateDiff = new int[] { 0, 0, 0, 0, 0, 0 };
            TimeSpan diff = date2 - date1;
            double totalDays = diff.TotalDays;
            bool isMinus = totalDays <= -1 ? true : false;
            totalDays = totalDays <= -1 ? totalDays * -1 : totalDays;
            int Years = 0;
            int Months = 0;
            int Days = 0;
            DateTime workingDate = date1;
            while (date1 < date2)
            {
                date1 = date1.AddMonths(1);

                if (date1 < date2)
                {
                    Months++;

                    if (Months == 12)
                    {
                        workingDate = workingDate.AddYears(1);
                        Years++;
                        Months = 0;

                        date1 = workingDate;
                    }
                }

            }
            workingDate = workingDate.AddMonths(Months);
            diff = date2 - workingDate;
            Days = diff.Days;

            dateDiff[(int)DateDiffPart.Day] = Days;
            dateDiff[(int)DateDiffPart.Month] = Months;
            dateDiff[(int)DateDiffPart.Year] = Years;
            dateDiff[(int)DateDiffPart.TotalDays] = int.Parse(totalDays + "");
            dateDiff[(int)DateDiffPart.IsMinusDiff] = isMinus == true ? 1 : 0;
            dateDiff[(int)DateDiffPart.IsValidDiff] = 1;
            return dateDiff;
        }

        public int[] DateHDiff(string date1, string date2)
        {
            return DateHDiff(date1, date2, false);
        }

        public int[] DateHDiff(string date1, string date2, bool isMonth30)
        {
            int D1; int M1; int Y1;
            int D2; int M2; int Y2;
            int[] dateDiff = new int[] { 0, 0, 0, 0, 0, 0 };

            string monthStamp = "";
            try
            {
                D1 = int.Parse(date1.Substring(0, 2));
                M1 = int.Parse(date1.Substring(3, 2));
                Y1 = int.Parse(date1.Substring(6, 4));

                D2 = int.Parse(date2.Substring(0, 2));
                M2 = int.Parse(date2.Substring(3, 2));
                Y2 = int.Parse(date2.Substring(6, 4));
            }
            catch
            {
                return dateDiff;//if problem happened so it will return dateDiff which have DateDiffPart.IsValidDiff part set to 0
            }

            //if date is equal
            if (D1 == D2 && M1 == M2 && Y1 == M2)
                return dateDiff;
            //check if date1 is greater than date2, so result will be returned in minus
            if (Y1 > Y2 || (Y1 >= Y2 && M1 > M2) || (Y1 >= Y2 && M1 >= M2 && D1 > D2))
            {
                D1 = int.Parse(date2.Substring(0, 2));
                M1 = int.Parse(date2.Substring(3, 2));
                Y1 = int.Parse(date2.Substring(6, 4));
                D2 = int.Parse(date1.Substring(0, 2));
                M2 = int.Parse(date1.Substring(3, 2));
                Y2 = int.Parse(date1.Substring(6, 4));
                dateDiff[(int)DateDiffPart.IsMinusDiff] = 1;
            }




            string sqlString = string.Format("SELECT * FROM dbo.HIJRA_CONVERT WHERE HYEAR BETWEEN {0} AND {1}", Y1, Y2);
            //DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
            //DataTable table = GenericDataAccess.ExecuteSelectCommand(comm);
            //foreach (DataRow row in table.Rows)


            var Lst = db.Database.SqlQuery<HIJRA_CONVERT>(sqlString).ToList();
            for (var i = 0; i < Lst.Count; i++)
            {
                monthStamp += Lst[i].MONTHSTMAP;
            }
            if (isMonth30)
                monthStamp = monthStamp.Replace("0", "1");

            if (Y1 == Y2 && M1 == M2)
            {
                //if two date are in same year and month so days  of date1 will not be added
            }
            else
            {
                monthStamp = monthStamp.Substring(M1 - 1);//so monthstamp will contain stamps starting with current month stamp
                                                          //add diff between first month and d1, ex: date 1 = 5/1/1400 so add diff 30 - 5 = 25

                dateDiff[(int)DateDiffPart.TotalDays] += (monthStamp.Substring(0, 1) == "1" ? 30 : 29) - D1;
            }

            if (D2 >= D1)
                dateDiff[(int)DateDiffPart.Day] = D2 - D1;
            else
                dateDiff[(int)DateDiffPart.Day] = (monthStamp.Substring(0, 1) == "1" ? 30 : 29) - (D1 - D2);
            if (M2 >= M1)
                dateDiff[(int)DateDiffPart.Month] = (D2 < D1 && M1 == M2 && Y2 > Y1) ? 11
                   : M2 - M1 - (D1 > D2 && M2 > M1 ? 1 : 0);//case date1 5/7/1432, date2 4/7/1433 so month diff should be 11 
                                                            //case 2 date 1 10/07/1432 ,date2 01/12/1432 so month diff should be 4 not 5
            else
                dateDiff[(int)DateDiffPart.Month] = 12 - (M1 - M2) - (D1 > D2 ? 1 : 0);

            if (Y2 > Y1)
                dateDiff[(int)DateDiffPart.Year] = Y2 - Y1 - (M1 > M2 || (M1 == M2 && D1 > D2) ? 1 : 0);


            int dateDiffMonthNo = 0;

            if (Y1 == Y2)
                dateDiffMonthNo = M1 == M2 ? 0 : M2 - M1;
            else
                dateDiffMonthNo = 13 - M1 + (M2 - 1) + ((Y2 - Y1 - 1) * 12);





            //monthStamp = monthStamp.Substring(0, ((Y2 -( Y1 +((Y2 > Y1 && M1 > M2 )? 1 : 0) )) * 12) + (M1 >= M2 ? 12 - M1 : M2 - 1) );// will contains only till month of date2 except month of date 2 as last month in y2, its days will be added 
            monthStamp = monthStamp.Substring(0, dateDiffMonthNo);// will contains only till month of date2 except month of date 2 as last month in y2, its days will be added 
                                                                  //add days of last month of date2
            dateDiff[(int)DateDiffPart.TotalDays] += (Y1 == Y2 && M1 == M2 ? D2 - D1 : D2);

            //delete first month as its diff has been added before
            if (monthStamp.Length > 1)
            {
                monthStamp = monthStamp.Substring(1);
                foreach (char m in monthStamp)
                {
                    dateDiff[(int)DateDiffPart.TotalDays] += (m == '1' ? 30 : 29);
                }
            }
            dateDiff[(int)DateDiffPart.IsValidDiff] = 1;
            return dateDiff;
        }

        public static string GenerateGuid()
        {
            Guid obj = Guid.NewGuid();

            return obj.ToString();
        }












    }
}