const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qrvxaoabzhxgcjjejffq.supabase.co',
  'sb_publishable_Yx9BTl5jV48FJRy1_lNWSw_pO00gDDf'
);

async function run() {
  const { data, error } = await supabase
    .from('marketing_articles')
    .select('content, title')
    .eq('slug', 'nhom-estp')
    .single();

  if (error) {
    console.error(error);
  } else {
    console.log("TITLE:\n", data.title);
    console.log("CONTENT:\n", data.content);
  }
}

run();
