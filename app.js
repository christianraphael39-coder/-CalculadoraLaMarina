// Substitua pelas suas credenciais do Supabase
const SUPABASE_URL = "https://pldamguukjeuakrvfbzf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_UybNTjqz8fdbDLFhxJvO5Q_78P0AM6Y";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Carregar tarefas
async function loadTodos() {
  const { data, error } = await supabase.from("todos").select("*");
  list.innerHTML = "";
  data.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    list.appendChild(li);
  });
}

// Adicionar tarefa
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value;
  await supabase.from("todos").insert({ text, done: false });
  input.value = "";
  loadTodos();
});

loadTodos();
