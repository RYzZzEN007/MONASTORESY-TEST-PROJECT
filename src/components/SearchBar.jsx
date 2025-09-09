import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ data, onSelect }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const results = data.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder={t("search")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul>
          {results.map((m) => (
            <li key={m.id} onClick={() => onSelect(m)}>
              {m.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
