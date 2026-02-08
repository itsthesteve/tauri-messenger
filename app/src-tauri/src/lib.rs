mod commands;
mod security;

use crate::commands::*;
use crate::security::generate_keys;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![create_screen_name])
        .setup(|app| {
            let app_dir = app.path().app_config_dir().unwrap();
            // READ THE BOOK
            // WHAT IS THIS
            println!(
                "App directory: {:?}",
                app_dir.to_str().ok_or("idk").unwrap()
            );

            // Just a test to see if it works
            let user_keys = generate_keys();
            println!("Private {:?}", hex::encode(user_keys.public_bytes));
            println!("Public {:?}", hex::encode(user_keys.private_bytes));

            // Create the private/public keys here
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
