using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Identity
{
    /// <summary>
    /// We will assume for this educational course that one user has one address.
    /// </summary>
    public class Address
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        [Required] public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}