namespace ReactApp2.Server.Models
{
    public class Users
    {
        public long Id { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public bool IsPositioningServiceOpen { get; set; }
    }
}
