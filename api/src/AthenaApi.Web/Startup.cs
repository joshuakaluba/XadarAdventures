using AthenaApi.Data.DataAccessLayer.Authentication;
using AthenaApi.Data.DataAccessLayer.Challenges;
using AthenaApi.Data.DataAccessLayer.Courses;
using AthenaApi.Data.DataContext;
using AthenaApi.Data.Models;
using AthenaApi.Data.Services.Authentication;
using AthenaApi.Web.MiddleWare;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using TokenOptions = AthenaApi.Data.Services.Authentication.TokenOptions;

namespace AthenaApi.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AthenaDataContext>();

            services.AddScoped<IUserValidatorService, UserValidatorService>();
            services.AddScoped<ITokenGeneratorService, TokenGeneratorService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<IChallengeRepository, ChallengeRepository>();


            services.AddCors(o => o.AddPolicy("AthenaApiCorsPolicy", corsBuilder =>
            {
                corsBuilder.WithOrigins("http://localhost:3000")
                    .WithOrigins("https://athenaweb.kaluba.tech")
                    .WithOrigins("https://xadaradventures.com")
                    .WithOrigins("https://www.xadaradventures.com")                    
                    .WithOrigins("http://xadaradventures.com")
                    .WithOrigins("http://www.xadaradventures.com")
                    .WithOrigins("http://athenaweb.kaluba.tech")
                    .WithOrigins("https://*")
                    .WithOrigins("http://*")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));

            services.AddIdentity<ApplicationUser, IdentityRole>(option =>
            {
                option.Password.RequireDigit = false;
                option.Password.RequiredLength = 6;
                option.Password.RequiredUniqueChars = 0;
                option.Password.RequireLowercase = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequireUppercase = false;
            }).AddEntityFrameworkStores<AthenaDataContext>()
              .AddDefaultUI()
              .AddDefaultTokenProviders();

            services.AddAuthentication()
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = Configuration["TokenOptions:Issuer"],
                        ValidAudience = Configuration["TokenOptions:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenOptions:Key"])),
                    };
                });

            services.AddAuthorization(options => options.AddPolicy("Trusted", policy => policy.RequireClaim("DefaultUserClaim", "DefaultUserAuthorization")));
            services.AddOptions();
            services.Configure<TokenOptions>(Configuration.GetSection("TokenOptions"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            try
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    app.UseDatabaseErrorPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                }

                app.UseRouting();

                app.UseCors("AthenaApiCorsPolicy");
                app.UseMiddleware<MaintainCorsHeadersMiddleware>();
                app.UseStaticFiles();
                app.UseAuthentication();

                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                });

                DataContextInitializer.UpdateContext(serviceProvider).Wait();
                DataContextInitializer.CreateUserRoles(serviceProvider).Wait();
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }
}