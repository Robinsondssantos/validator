# 🧩 Validator

Uma biblioteca leve e simples de **validação reativa** para Vue 3.  
Permite criar e gerenciar campos e regras de validação de forma declarativa e reusável

---

🧠 Conceito

A biblioteca gira em torno de dois conceitos principais:
* **Field** — representa um campo do formulário com regras e estado de erro.
* **Form** — agrupa e gerencia múltiplos campos.

🛠️ Exemplo básico

``typescript
import { createForm, required, minLength } from '@seu-nome/validator'

const form = createForm()

const name = form.addField('name')
name.addRules([required(), minLength(3)])

name.validate('') // => "Esse campo é obrigatório"
name.validate('Al') // => "Deve ter pelo menos 3 caracteres"
name.validate('Alice') // => ""

form.isValid() // => true ou false
```

🧩 API

createForm()

Cria um novo formulário e retorna um objeto com os seguintes métodos:

| Método                   | Descrição                                                 |
| ------------------------ | --------------------------------------------------------- |
| `addField(name: string)` | Cria e adiciona um novo campo. Retorna um objeto `Field`. |
| `isValid()`              | Retorna `true` se todos os campos estiverem válidos.      |
| `reset()`                | Reseta todos os erros dos campos.                         |


defineField(name: string)

Cria um campo independente.
Útil quando você quer usar o Field sem precisar de um formulário completo.

Um Field possui:

| Propriedade / Método      | Tipo                | Descrição                                                        |
| ------------------------- | ------------------- | ---------------------------------------------------------------- |
| `name`                    | `string`            | Nome do campo                                                    |
| `error`                   | `Ref<string>`       | Mensagem de erro reativa                                         |
| `addRules(rules: Rule[])` | `(rules) => void`   | Define as regras de validação                                    |
| `validate(value)`         | `(value) => string` | Valida um valor e retorna a mensagem de erro (ou `""` se válido) |
| `reset()`                 | `() => void`        | Limpa o erro                                                     |
| `isValid()`               | `() => boolean`     | Retorna `true` se não há erro                                    |

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

🧮 Exemplo com Vue 3 (Composition API)

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

🧱 Build manual

Para compilar a biblioteca localmente:
npm run build

Saída esperada:
``bash
dist/
 ├─ validator.es.js
 ├─ validator.umd.js
 └─ validator.d.ts
 ``

🧾 Licença

MIT


💬 Autor

Desenvolvido por Robinson D. S. Santos
