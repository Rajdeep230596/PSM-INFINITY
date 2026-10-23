CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  admin_id INT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY password_reset_token_hash (token_hash),
  KEY password_reset_admin (admin_id),
  CONSTRAINT password_reset_admin_fk FOREIGN KEY (admin_id) REFERENCES admins (id) ON DELETE CASCADE
);
