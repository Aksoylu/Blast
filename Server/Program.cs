using Microsoft.Extensions.Options;

using MongoDB.Driver;
using FluentValidation.AspNetCore;
using BlastBackend.Core;
using BlastBackend.Core.Interfaces;
using BlastBackend.Core.Models;
using BlastBackend.Repository;
using BlastBackend.Interfaces.Domain;
using BlastBackend.Interfaces.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddScoped<IMongoDbService, MongoDbService>();
builder.Services.AddScoped<ICryptService, CryptService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();


builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   // app.UseSwagger();
   // app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
