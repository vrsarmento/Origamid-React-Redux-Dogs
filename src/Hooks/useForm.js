import React from 'react'

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido.'
  },
  password: {
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/,
    message:
      'A senha precisa ter 8 ou mais caracteres, contendo pelo menos 1 minúsculo [a-z], 1 maiúsculo [A-Z], 1 dígito [0-9] e um caracter especial [!@#$%^&*]'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números.'
  }
}

const useForm = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)

  function validate(value) {
    if (type === false) return true
    if (value.length === 0) {
      setError('Preencha um valor.')
      return false
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value)
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
    onFocus: () => setError(null)
  }
}

export default useForm
