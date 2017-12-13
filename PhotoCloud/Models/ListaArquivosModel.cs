using System;
using System.Collections.Generic;

namespace PhotoCloud.Models
{

    public class ListaDirModel
    {

        public string DirBase { get; set; }
        public string Dir { get; set; }
        public string DirName { get; set; }
        public DateTime DirAccessed { get; set; }
    }

    public class ListaFileModel
    {
        public string FileName { get; set; }
        public string FileDirectory { get; set; }
        public string FileDirectoryName { get; set; }
        public string FileSizeText { get; set; }
        public DateTime FileAccessed { get; set; }
        public string FileExtension { get; set; }

    }

    public class ListaConteudoDirModel
    {
        public List<ListaDirModel> dirModelList;
        public List<ListaFileModel> fileModelList;

        public ListaConteudoDirModel(List<ListaDirModel> _dirModelList, List<ListaFileModel> _fileModelList)
        {
            dirModelList = _dirModelList;
            fileModelList = _fileModelList;
        }
    }
}