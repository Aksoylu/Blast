using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BlastBackend.Models.Entity
{
    public class EUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("organization")]
        public string? Organization { get; set; }

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; }
    }
}
