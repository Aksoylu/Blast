using Microsoft.Extensions.Options;

using MongoDB.Driver;
using FluentValidation.AspNetCore;

using BlastServer.API.Middleware;

using BlastServer.Domain.Interfaces.Repositories;

using BlastServer.Application.Services;

using BlastServer.Infrastructure.Configuration;
using BlastServer.Infrastructure.Services;
using BlastServer.Infrastructure.Persistence.Repository;
using BlastServer.Infrastructure.Cache;

using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Infrastructure.Persistence;
using BlastServer.Application.Mappings;
using Microsoft.Extensions.DependencyInjection;


var builder = WebApplication.CreateBuilder(args);

#region Configurations
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});
#endregion

#region Infrastructure Services
builder.Services.AddScoped<IMongoDbService, MongoDbService>();
builder.Services.AddScoped<ICryptService, CryptService>();
builder.Services.AddScoped<IJwtService, JwtService>();
#endregion

#region Repositoryies
builder.Services.AddScoped<IUserRepository, UserRepository>();
#endregion

#region App Services
builder.Services.AddScoped<IAuthorizationAppService, AuthorizationAppService>();
#endregion

#region Cache Providers
builder.Services.AddScoped<IAuthSessionCacheService, AuthSessionCacheService>();
#endregion

#region Mappings
builder.Services.AddAutoMapper(mappingProfiles =>
{
    mappingProfiles.AddProfile<AuthMappingProfile>();
});
#endregion


#region Dependencies
builder.Services.AddMemoryCache();
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
#endregion

#region Middlewares
var app = builder.Build();
app.UseMiddleware<RunSafely>();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
#endregion
