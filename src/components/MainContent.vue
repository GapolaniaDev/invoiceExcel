<template>
  <main>
    <section id="home">
      <h2>Bienvenido</h2>
      <p>Esta es una página diseñada con un enfoque mobile-first utilizando Vue.js.</p>
    </section>
    <section id="about">
      <h2>Acerca de</h2>
      <p>Más información sobre nosotros.</p>
    </section>
    <section id="contact">
      <h2>Contacto</h2>
      <form @submit.prevent="handleSubmit">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" required>
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="form.email" required>
        <label for="message">Mensaje:</label>
        <textarea id="message" v-model="form.message" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MainContent',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      alert('Formulario enviado con éxito!');
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
}
</script>

<style scoped>
main {
  padding: 1rem;
}

section {
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}

input, textarea {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
