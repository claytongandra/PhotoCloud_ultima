using System;
using System.Collections.Generic;

namespace PhotoCloud.Models
{
    
    public class DiretorioModel
    {

        public string DirBase { get; set; }
        public string Dir { get; set; }
        public string DirName { get; set; }
        public DateTime DirAccessed { get; set; }
    }

    public class FileModel
    {
        public string FileName { get; set; }
        public string FileDirectory { get; set; }
        public string FileDirectoryName { get; set; }
        public string FileSizeText { get; set; }
        public DateTime FileAccessed { get; set; }
        public string FileExtension { get; set; }
        
    }

    public class FileTreeModel
    {
        public List<DiretorioModel> dirModelList;
        public List<FileModel> fileModelList;

        public FileTreeModel(List<DiretorioModel> _dirModelList, List<FileModel> _fileModelList)
        {
            dirModelList = _dirModelList;
            fileModelList = _fileModelList;
        }
    }
}