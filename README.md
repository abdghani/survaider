# Survaider Assignment
>  DEMO

[adult.greyphase.xyz](adult.greyphase.xyz)


>  DATASET

 http://archive.ics.uci.edu/ml/datasets/Adult
### REQUIREMENT
```
NODE > V6.9.0 
NPM > V5.5.0
```

> FRONTEND

```
cd front
npm i && bower i
gulp serve
```
> FRONTEND

```
cd front
npm i && bower i
gulp serve
```
> INFO 

For backend ExpressJS is used and for front end angular js is used . [Google charts](http://angular-google-chart.github.io/angular-google-chart/) is used for displaying data in front end . [Mongodb](https://www.mongodb.com/) is used as a database . For angular, Yeoman generator is used . Details can be found  [here](https://github.com/Swiip/generator-gulp-angular) . For design [Apple UIKit](https://getuikit.com/) is used.

For Caching and large amount of request Nginx is both used as a reverse proxy and loadbalancer.
Backend Has two server running at 
>- port(4021) -> api.adultdataset1.greyphase.xyz
>- port(4022) -> api.adultdataset2.greyphase.xyz

Base backend server
>- api.adultdataset.greyphase.xyz

> Nginx configuration :-
```
upstream backend {
    server localhost:4021;
    server localhost:4022;
    keepalive 600;
}
proxy_cache_path /var/cache/nginx/tag levels=1:2 keys_zone=tag:10m inactive=1d max_size=10g;
server{
    listen 80;
    server_name api.adultdataset.greyphase.xyz;
    client_max_body_size 2m;
    client_body_buffer_size 2m;
    set $request_body_md5 "";
    rewrite_by_lua '
     ngx.req.read_body()
     local body = ngx.req.get_body_data()
     ngx.var.request_body_md5 = ngx.md5(body)
    ';

    location /api{
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Connection "";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache tag;
        proxy_cache_key "$uri|$query_string|$request_body_md5";
        proxy_cache_valid 200 1d;
        proxy_cache_methods POST;
        add_header X-Cache-Status $upstream_cache_status;

        proxy_pass http://backend;
  }
}
```
### LOAD BALANCING AND PROXY PASSING
A pool(4021,4022) is created and name `backend` . Caching path is defined as `/var/cache/nginx/tag` . Every unique request is cached based on `url , querystring and body` to the directory mentioned above . All the api calls with /api are proxy passed to the api pool . Nginx is built to handle many concurrent connections at the same time. This makes it ideal for being the point-of-contact for clients. The server can pass requests to any number of backend servers to handle the bulk of the work, which spreads the load across your infrastructure. This design also provides you with flexibility in easily adding backend servers or taking them down as needed for maintenance.


