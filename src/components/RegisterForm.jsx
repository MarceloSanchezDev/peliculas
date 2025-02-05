export function RegisterForm({ setEmail, setUser, funct }) {
  return (
    <form onSubmit={funct}>
      <label htmlFor="nombreRegister">Nombre:</label>
      <input
        type="text"
        name="nombreRegister"
        id="nombreRegister"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="apellidoRegister">Apellido:</label>
      <input
        type="text"
        id="apellidoRegister"
        name="apellidoRegister"
        onChange={(e) => setUser(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
