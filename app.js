const supabaseUrl = "https://dbyzmxukmmiufnbtgwqq.supabase.co";
const supabaseAnonKey = "sb_publishable_idyta_QovGeRuSLej2ApIA_HMfbkYxD";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

async function getData() {
  const { data } = await supabaseClient.from("users").select("*");
  console.log(data);
}
getData();

