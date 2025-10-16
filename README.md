# 🧩 Validator  

Uma biblioteca leve e simples de **validação de formulário** para Vue 3.  
Permite criar e gerenciar campos e regras de validação de forma declarativa e reusável

---

## 🧠 Conceito  

A biblioteca é construída sobre três conceitos principais:
* **Form** — agrupa e gerencia múltiplos campos.
* **Field** — representa um campo do formulário com regras e estado de erro.
* **Rule** — função que define uma regra de validação.

## 🛠️ Exemplo básico

```ts
import { createForm, required, minLength } from 'validator'

const form = createForm()

const name = form.addField('name')
name.addRules([required(), minLength(3)])

name.validate('') // => "Esse campo é obrigatório"
name.validate('Al') // => "Deve ter pelo menos 3 caracteres"
name.validate('Alice') // => ""

form.isValid() // => true ou false
```

## 🧩 API  

### `createForm()`

Cria um novo formulário e retorna um objeto com os seguintes métodos:

| Método                   | Descrição                                                 |
| ------------------------ | --------------------------------------------------------- |
| `addField(name: string)` | Cria e adiciona um novo campo. Retorna um objeto `Field`. |
| `isValid()`              | Retorna `true` se todos os campos estiverem válidos.      |
| `reset()`                | Reseta todos os erros dos campos.                         |


### `defineField(name: string)`

Cria um campo independente.  
Útil quando você quer usar o Field sem precisar de um formulário completo.

Um `Field` possui:

| Propriedade / Método      | Tipo                | Descrição                                                        |
| ------------------------- | ------------------- | ---------------------------------------------------------------- |
| `name`                    | `string`            | Nome do campo                                                    |
| `error`                   | `Ref<string>`       | Mensagem de erro reativa                                         |
| `addRules(rules: Rule[])` | `(rules) => void`   | Define as regras de validação                                    |
| `validate(value)`         | `(value) => string` | Valida um valor e retorna a mensagem de erro (ou `""` se válido) |
| `reset()`                 | `() => void`        | Limpa o erro                                                     |
| `isValid()`               | `() => boolean`     | Retorna `true` se não há erro                                    |
  
### `rule(value: string|number|boolean|null) => boolean|string`  

Uma `Rule` é uma função que recebe o valor do campo e retorna:

* `true` se o valor for válido
* Uma **string** com a mensagem de erro se inválido

```ts
type Rule = (value: string | number | boolean | null) => boolean | string
```  

#### * **Usando nullable com regras**  

Se quiser permitir valores vazios, mas ainda validar quando preenchido:  
```ts
import { nullable, minLength } from '@seu-nome/validator'

const username = form.addField('username')
username.addRules([nullable([minLength(3)])])

username.validate('') // => válido
username.validate('Al') // => "Deve ter pelo menos 3 caracteres"
```

#### * **Regras encadeadas**  

Você pode combinar várias regras em um campo:  
```ts
age.addRules([
  required('Idade é obrigatória'),
  minValue(18, 'Você precisa ser maior de idade'),
])
```  
As regras são avaliadas em ordem. A primeira que retornar uma string **define o erro** do campo.

📏 Regras de validação prontas

| Função                     | Descrição                                      |
| -------------------------- | ---------------------------------------------- |
| `required(message?)`       | Verifica se o valor é preenchido               |
| `minLength(n, message?)`   | Mínimo de caracteres                           |
| `maxLength(n, message?)`   | Máximo de caracteres                           |
| `length(n, message?)`      | Tamanho exato                                  |
| `minValue(n, message?)`    | Valor mínimo numérico                          |
| `maxValue(n, message?)`    | Valor máximo numérico                          |
| `matches(regex, message?)` | Verifica padrão (regex)                        |
| `email(message?)`          | Email válido                                   |
| `phone(message?)`          | Telefone no formato `(99) 99999-9999`          |
| `date(message?)`           | Data no formato `YYYY-MM-DD`                   |
| `cpf(message?)`            | CPF no formato `000.000.000-00`                |
| `cnpj(message?)`           | CNPJ no formato `00.000.000/0000-00`           |
| `cep(message?)`            | CEP no formato `00000-000`                     |
| `nullable(rules)`          | Permite campo vazio, mas valida se tiver valor |

## 🧮 Exemplo com Vue 3 (Composition API)  

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { createForm, required, email } from '@seu-nome/validator'

const form = createForm()
const emailField = form.addField('email')
emailField.addRules([required(), email()])

const emailValue = ref('')

function submit() {
  emailField.validate(emailValue.value)
  if (form.isValid()) {
    alert('Formulário válido!')
  } else {
    alert('Por favor, corrija os erros.')
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <label>Email:</label>
    <input v-model="emailValue" type="email" />
    <p v-if="emailField.error">{{ emailField.error }}</p>
    <button type="submit">Enviar</button>
  </form>
</template>
```

## 🧱 Build manual  

Para compilar a biblioteca localmente:
```bash
npm run build
```

Saída esperada:

```bash
dist/
 ├─ validator.es.js
 ├─ validator.umd.js
 └─ validator.d.ts
```

## 🧾 Licença  

MIT

## 💬 Autor  

Desenvolvido por **Robinson D. S. Santos**
