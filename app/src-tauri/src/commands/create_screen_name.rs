#[tauri::command]
pub async fn create_screen_name(
    screen_name: &str,
    password: &str,
) -> Result<(), std::string::String> {
    Ok(())
}
