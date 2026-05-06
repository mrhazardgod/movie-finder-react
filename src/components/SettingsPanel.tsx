import { useState } from "react";
import { getApiKey, saveApiKey } from "../utils";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function SettingsPanel({ onClose, onSaved }: Props) {
  const [key, setKey] = useState(getApiKey());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveApiKey(key.trim());
    setSaved(true);
    setTimeout(() => { onSaved(); onClose(); }, 800);
  };

  return (
    <div className="settings-overlay" data-edit-id="settings-overlay">
      <div className="settings-panel" data-edit-id="settings-panel">
        <div className="settings-header" data-edit-id="settings-panel-header">
          <h2 data-edit-id="settings-panel-title">Настройки API</h2>
          <button className="settings-close-btn" onClick={onClose} data-edit-id="settings-close-btn">Закрыть</button>
        </div>
        <p className="settings-desc" data-edit-id="settings-panel-desc">
          Вставьте <a href="https://www.omdbapi.com/apikey.aspx" target="_blank" rel="noreferrer">OMDb API ключ</a>,
          чтобы искать больше фильмов. Базовые русские запросы работают и без ключа.
        </p>
        <input
          id="api-key-input"
          className="api-key-input"
          type="text"
          placeholder="Например: abc12345"
          value={key}
          onChange={(e) => { setKey(e.target.value); setSaved(false); }}
          data-edit-id="api-key-input"
        />
        <div className="settings-footer" data-edit-id="settings-panel-footer">
          <span
            id="api-key-status"
            className={`api-key-status ${saved ? "status-ok" : key ? "status-set" : "status-missing"}`}
            data-edit-id="api-key-status"
          >
            {saved ? "Ключ сохранен" : key ? "Ключ добавлен" : "Ключ не добавлен"}
          </span>
          <button id="save-api-key-button" className="save-key-btn" onClick={handleSave} data-edit-id="save-api-key-button">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
