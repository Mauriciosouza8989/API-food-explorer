<h1 align="center">Backend FoodExplorer</h1>

<p >
API Rest completa utilizando Node.js e Expresss, de um menu digital para um restaurante fictício, conhecido como FoodExplorer. A API permite o usuário admim criar/editar/apagar pratos do menu, fazer upload de imagens. Usuário comum pode visualizar o menu ou um prato especifico
</p> 

<p align="center">
  <a href="#como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#foi-utilizado">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/Mauriciosouza8989/Mauriciosouza8989-food-explorer-tree-main-front-food-explorer">Front-end</a>&nbsp;&nbsp;&nbsp;
</p>


## Como rodar

```
npm i
```

```
npm run migrate
```

```
npm run dev
```

```bash
# Admin login
$ email: admin@admin.com
$ password: vidamansa
```

## Endpoints

### Users

`POST`: 
```bash 
/users/
```

### Authenticate (login)

`POST`: 
```bash 
/sessions/
```

### Favorites (pratos favoritos do usuário)

`POST`: 
```bash 
/favorites/
```

`GET`: 
```bash 
/favorites/
```


### Dishes

`POST`: 
```bash 
/products/
```

`PUT`: 
```bash 
/products/:id
```

`DELETE`: 
```bash 
/products/:id
```

`GET`: 
```bash 
/products/
```

`GET`: 
```bash 
/products/:id
```


## Foi utilizado:
- `Node.js`
- `Express`
- `SQLite`
- `Knex.js`
- `Autenticação`
- `JWT`
- `Middlewares`
- `Upload de imagens`
- `API Restful`
- `Cors`
- `PM2`
- `Deploy e utilização do render`
- `Variáveis de ambiente`
- `Testes automatizados`
- `Jest`

---
## 🎨 Veja o [Fron-end](https://github.com/Mauriciosouza8989/Mauriciosouza8989-food-explorer-tree-main-front-food-explorer) 
---