using FluentValidation.AspNetCore;

using BlastServer.API.Middleware;
using BlastServer.Application.Mappings;
using BlastServer.Application.Services;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.Repositories;
using BlastServer.Infrastructure;
using BlastServer.Infrastructure.Cache.Providers;
using BlastServer.Infrastructure.Persistence.Repository;
using BlastServer.Domain.Services;
using BlastServer.Domain.Interfaces.DomainService;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

#region Dependencies
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();

InfrastructureAssembly.InjectJWT(ref builder);
InfrastructureAssembly.InjectDatabase(ref builder);
InfrastructureAssembly.InjectCache(ref builder);
#endregion

#region Repositoryies
builder.Services.AddScoped<IUserRepository, UserRepository>();
#endregion

#region App Services
builder.Services.AddScoped<IAuthorizationAppService, AuthorizationAppService>();
#endregion

#region Domain Services
builder.Services.AddScoped<IAuthorizationDomainService, AuthorizationDomainService>();
#endregion

#region Cache Providers
builder.Services.AddScoped<IAuthSessionCacheProvider, AuthSessionCacheProvider>();
#endregion

#region Mappings
builder.Services.AddAutoMapper(mappingProfiles =>
{
    mappingProfiles.AddProfile<AuthMappingProfile>();
});
#endregion



#region Middlewares
var app = builder.Build();
app.UseMiddleware<RunSafely>();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
#endregion
