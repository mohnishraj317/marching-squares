const colors = {
  random() {
    const comp = () => (~~(Math.random() * 255)).toString(16).padStart(2, '0');
    return `#${comp()}${comp()}${comp()}`;
  }
}