using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Application.DTOs
{
    public abstract class ResponseDTO
    {
        public bool IsSuccess { get; set; } = true;
        public string? ErrorMessage { get; set; }

    }
}
