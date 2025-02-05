export function LoginForm({ setEmail, setUser, funct }) {
  return (
    <form onSubmit={funct}>
      <label htmlFor="nombreLogin">Nombre:</label>
      <input
        type="text"
        name="nombreLogin"
        id="nombreLogin"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="apellidoLogin">Apellido:</label>
      <input
        type="text"
        id="apellidoLogin"
        name="apellidoLogin"
        onChange={(e) => setUser(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
