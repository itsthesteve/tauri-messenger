use crate::commands::get_http_client;
use serde_json::json;

#[tauri::command]
pub async fn create_screen_name(screen_name: &str, password: &str) -> Result<(), String> {
    let client = get_http_client().map_err(|e| e.to_string())?;
    let payload = json!({
        "screenName": screen_name,
        "password": password
    });

    let request = client
        .post("http://localhost:8080/api/v1/createScreenName")
        .json(&payload)
        .send()
        .await
        .map_err(|err| format!("Unable to send: {:?}", err))?;

    // YAH: Finish

    Ok(())
}
