using Backend.Data;
using Backend.Repositories;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ClientesProdutosDB"));

builder.Services.AddScoped<ClienteRepository>();
builder.Services.AddScoped<ClienteService>();

builder.Services.AddScoped<ProdutoRepository>();
builder.Services.AddScoped<ProdutoService>(); 

builder.Services.AddControllers();
builder.Services.AddAuthorization();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "APIs", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:4300")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "APIs");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowFrontend");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
