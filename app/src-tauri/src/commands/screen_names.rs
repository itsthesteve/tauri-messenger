use crate::commands::get_http_client;
use serde::Serialize;
use serde_json::json;

#[derive(Serialize)]
pub struct ApiResponse {
    pub body: String,
    pub status_code: u16,
}

#[tauri::command]
pub async fn create_screen_name(screen_name: &str, password: &str) -> Result<ApiResponse, String> {
    let client = get_http_client().map_err(|e| e.to_string())?;
    let payload = json!({
        "screenName": screen_name,
        "password": password
    });

    let res = client
        .post("http://localhost:8080/api/v1/screenName")
        .json(&payload)
        .send()
        .await
        .map_err(|err| format!("Error sending to server: {:?}", err))?;

    println!("Request OK");

    // YAH: Finish
    let status_code = res.status().as_u16();

    Ok(ApiResponse {
        body: String::from("ok"),
        status_code: status_code,
    })
}
