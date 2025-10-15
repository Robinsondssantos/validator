import { ref, type Ref } from "vue"

export type Rule = (value: string|number|boolean|null) => boolean|string

export type Field = {
  name: string,
  error: Ref<string>,
  addRules: (rules: Rule[]) => void,
  validate: (value: string) => string,
  reset: () => void,
  isValid: () => boolean,
}

export function defineField(name: string) {
  let _rules: Rule[] = []
  const error = ref('')
  return {
    name,
    error,
    addRules: (rules: Rule[]) => _rules = rules,
    validate: (value: string|number|boolean|null) => {
      error.value = ''
      for (const rule of _rules) {
        const result = rule(value)
        if (typeof result === 'string') {
          error.value = result
          break
        }
      }
      return error.value
    },
    reset: () => error.value = '',
    isValid: () => !error.value,
  }
}

export function createForm() {
  const fields: Field[] = []
  return {
    addField: (name: string) => {
      const field = defineField(name)
      fields.push(field)
      return field
    },
    isValid: () => {
      for (const field of fields) {
        if (!field.isValid()) {
          return false
        }
      }
      return true
    },
    reset: () => {
      for (const field of fields) {
        field.reset()
      }
    },
  }
}

export function length(value: number, message: string = `Deve ter exatamente ${value} ${(value > 1 ? 'caracteres' : 'caractere')}`) {
  return (v: string|number|boolean|null) => (typeof v === 'string' && v.length === value) || message
}

export function minLength(value: number, message: string = `Deve ter pelo menos ${value} ${(value > 1 ? 'caracteres' : 'caractere')}`) {
  return (v: string|number|boolean|null) => (typeof v === 'string' && v.length >= value) || message
}

export function maxLength(value: number, message: string = `Deve ter no máximo ${value} ${(value > 1 ? 'caracteres' : 'caractere')}`) {
  return (v: string|number|boolean|null) => (typeof v === 'string' && v.length <= value) || message
}

export function minValue(value: number, message: string = `O valor mínimo deve ser ${value}`) {
  return (v: string|number|boolean|null) => {
    const _v = Number(v)
    return (!isNaN(_v) && _v >= value) || message
  }
}

export function maxValue(value: number, message: string = `O valor máximo deve ser ${value}`) {
  return (v: string|number|boolean|null) => {
    const _v = Number(v)
    return (!isNaN(_v) && _v <= value) || message
  }
}

export function required(message: string = 'Esse campo é obrigatório') {
  return (v: string|number|boolean|null) => !!v || message
}

export function matches(regex: string|RegExp, message: string = 'Padrão inválido') {
  return (v: string|number|boolean|null) => (typeof v === 'string' && RegExp(regex).test(v)) || message
}

export function phone(message: string = 'Telefone inválido') {
  return (v: string|number|boolean|null) => ((typeof v === 'string') && v.length == 17) || message
}

export function date(message: string = 'Data inválida') {
  return matches(/^\d{4}-\d{2}-\d{2}$/, message)
}

export function cpf(message: string = 'CPF inválido') {
  return length(14, message)
}

export function cnpj(message: string = 'CNPJ inválido') {
  return length(18, message)
}

export function cep(message: string = 'CEP inválido') {
  return length(9, message)
}

export function email(message: string = 'Email inválido') {
  return matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message)
}

export function nullable(rules: Rule[]) {
  return (v: string|number|boolean|null) => {
    if (v === '' || v === null) return true
    for (const rule of rules) {
      const result = rule(v)
      if (typeof result === 'string') {
        return result
      }
    }
    return true  
  }
}

