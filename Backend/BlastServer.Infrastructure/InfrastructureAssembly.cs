using BlastServer.Domain.Interfaces.Abstractions;
using BlastServer.Infrastructure.Cache;
using BlastServer.Infrastructure.Configuration;
using BlastServer.Infrastructure.Persistence;
using BlastServer.Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection; 
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlastServer.Infrastructure;

public static class InfrastructureAssembly
{
    public static void InjectJWT(ref WebApplicationBuilder builder)
    {
        builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
        builder.Services.AddScoped<IJwtService, JwtService>();
        builder.Services.AddScoped<ICryptService, CryptService>();
    }

    public static void InjectDatabase(ref WebApplicationBuilder builder)
    {
        builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));
        builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
        {
            var settings = serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;
            return new MongoClient(settings.ConnectionString);
        });

        builder.Services.AddScoped<IMongoDbService, MongoDbService>();
    }

    public static void InjectCache(ref WebApplicationBuilder builder)
    {
        CacheSettings? cacheSettings = builder.Configuration.GetSection("CacheSettings").Get<CacheSettings>(); if (cacheSettings == null)
        {
            throw new ArgumentNullException(nameof(cacheSettings), "CacheSettings cannot be null. Please check your configuration.");
        }

        if (cacheSettings.Type.Equals("Redis", StringComparison.OrdinalIgnoreCase))
        {
            builder.Services.AddSingleton<IRedisService>(serviceProvider => new RedisService(ConnectionMultiplexer.Connect(cacheSettings.Redis.ConnectionString)));
            builder.Services.AddSingleton(typeof(ICacheService<>), typeof(RedisCacheService<>));
        }
        else
        {
            builder.Services.AddMemoryCache();
            builder.Services.AddSingleton(typeof(ICacheService<>), typeof(MemoryCacheService<>));
        }
    }

}
