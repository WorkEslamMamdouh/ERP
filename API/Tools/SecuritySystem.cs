using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Xml;

namespace Inv.API.Tools
{
   
    public static class SecuritySystem
    {
        public static string Encrypt(string sourceData)
        {
            byte[] key = new byte[] { 90, 20, 30, 40, 50, 55, 170, 128 };
            byte[] iv = new byte[] { 190, 2, 3, 4, 5, 6, 220, 8 };
            try
            {
                byte[] sourceDataBytes = ASCIIEncoding.UTF8.GetBytes(sourceData);
                MemoryStream tempStream = new MemoryStream();
                DESCryptoServiceProvider encryptor = new DESCryptoServiceProvider();
                CryptoStream encryptionStream = new CryptoStream(tempStream, encryptor.CreateEncryptor(key, iv), CryptoStreamMode.Write);
                encryptionStream.Write(sourceDataBytes, 0, sourceDataBytes.Length);
                encryptionStream.FlushFinalBlock();
                byte[] encryptedDataBytes = tempStream.GetBuffer();
                return Convert.ToBase64String(encryptedDataBytes, 0, (int)tempStream.Length);
            }
            catch
            {
                throw new Exception("Unable to encrypt data");
            }
        }

        public static string Decrypt(string sourceData)
        {
            byte[] key = new byte[] { 90, 20, 30, 40, 50, 55, 170, 128 };
            byte[] iv = new byte[] { 190, 2, 3, 4, 5, 6, 220, 8 };
            try
            {
                byte[] encryptedDataBytes = Convert.FromBase64String(sourceData);
                MemoryStream tempStream = new MemoryStream(encryptedDataBytes, 0, encryptedDataBytes.Length);
                DESCryptoServiceProvider decryptor = new DESCryptoServiceProvider();
                CryptoStream decryptionStream = new CryptoStream(tempStream, decryptor.CreateDecryptor(key, iv), CryptoStreamMode.Read);
                StreamReader allDataReader = new StreamReader(decryptionStream);
                return allDataReader.ReadToEnd();
            }
            catch
            {
                throw new Exception("Unable to decrypt data");
            }

        }
    }
}