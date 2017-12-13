using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhotoCloud.Models
{
    public class NavegadorModel
    {
        public bool browserMobileDevice { get; set; }
        public string browserType { get; set; }
        public string browserName { get; set; }
        public string browserVersion { get; set; }
        public int browserMajorVersion { get; set; }
        public double browserMinorVersion { get; set; }
        public string browserPlatform { get; set; }
        public bool browserBeta { get; set; }
        public bool browserCrawler { get; set; }
        public bool browserAOL { get; set; }
        public bool browserWin16 { get; set; }
        public bool browserWin32 { get; set; }
        public bool browserFrames { get; set; }
        public bool browserTables { get; set; }
        public bool browserCookies { get; set; }
        public bool browserVBScript { get; set; }
        public string browserJavaScript { get; set; }
        public bool browserJavaApplets { get; set; }
        public bool browserActiveXControls { get; set; }
        public string browserSupportsJavaScript { get; set; }

    }
}