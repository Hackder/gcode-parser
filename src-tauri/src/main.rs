#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use tauri::Manager;

fn main() {
    tauri::Builder::default()
        // .setup(|app| {
        //     let window = app.get_window("main").unwrap();
        //     window.open_devtools();
        //     Ok(())
        // })
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
