using BlastServer.API.Middleware;
using BlastServer.Application.DTOs.Authorization;
using BlastServer.Application.Mappings;
using BlastServer.Application.Services;
using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Domain.Interfaces.DomainService;
using BlastServer.Domain.Interfaces.DomainServices;
using BlastServer.Domain.Interfaces.Repositories;
using BlastServer.Domain.Services;
using BlastServer.Infrastructure;
using BlastServer.Infrastructure.Cache.Providers;
using BlastServer.Infrastructure.Persistence.Repositories;
using BlastServer.Infrastructure.Persistence.Repository;
using FluentValidation;
using FluentValidation.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

#region Dependencies
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<RegisterRequestValidator>();


InfrastructureAssembly.InjectJWT(ref builder);
InfrastructureAssembly.InjectDatabase(ref builder);
InfrastructureAssembly.InjectCache(ref builder);
#endregion

#region Repositoryies
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ISystemSettingRepository, SystemSettingRepository>();
builder.Services.AddScoped<ITeamRepository, TeamRepository>();

#endregion

#region App Services
builder.Services.AddScoped<IAuthorizationAppService, AuthorizationAppService>();
builder.Services.AddScoped<ISystemManagementAppService, SystemManagementAppService>();
builder.Services.AddScoped<ITeamManagementAppService, TeamManagementAppService>();

#endregion

#region Domain Services
builder.Services.AddScoped<IAuthorizationDomainService, AuthorizationDomainService>();
builder.Services.AddScoped<ISystemManagementDomainService, SystemManagementDomainService>();
builder.Services.AddScoped<ITeamManagementDomainService, TeamManagementDomainService>();

#endregion

#region Cache Providers
builder.Services.AddScoped<IAuthSessionCacheProvider, AuthSessionCacheProvider>();
builder.Services.AddScoped<ISystemSettingCacheProvider, SystemSettingCacheProvider>();
#endregion

#region Mappings
builder.Services.AddAutoMapper(mappingProfiles =>
{
    mappingProfiles.AddProfile<AuthMappingProfile>();
    mappingProfiles.AddProfile<SystemSettingMappingProfile>();
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
