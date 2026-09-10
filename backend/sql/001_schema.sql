CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY admins_email (email)
);

CREATE TABLE IF NOT EXISTS industries (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(190) NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NULL,
  hero_media_url VARCHAR(500) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  published TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY industries_slug (slug)
);

CREATE TABLE IF NOT EXISTS companies (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(190) NOT NULL,
  industry_id INT UNSIGNED NOT NULL,
  summary TEXT NOT NULL,
  positioning TEXT NULL,
  logo_url VARCHAR(500) NULL,
  website_url VARCHAR(500) NULL,
  published TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY companies_slug (slug),
  KEY companies_industry (industry_id),
  CONSTRAINT companies_industry_fk FOREIGN KEY (industry_id) REFERENCES industries (id)
);

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(190) NOT NULL,
  company_id INT UNSIGNED NOT NULL,
  industry_id INT UNSIGNED NOT NULL,
  summary TEXT NOT NULL,
  destination_url VARCHAR(500) NULL,
  published TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY products_slug (slug),
  KEY products_company (company_id),
  KEY products_industry (industry_id),
  CONSTRAINT products_company_fk FOREIGN KEY (company_id) REFERENCES companies (id),
  CONSTRAINT products_industry_fk FOREIGN KEY (industry_id) REFERENCES industries (id)
);

CREATE TABLE IF NOT EXISTS product_specs (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  label VARCHAR(190) NOT NULL,
  value VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY product_specs_product (product_id),
  CONSTRAINT product_specs_product_fk FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS media (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  owner_type ENUM('industry', 'company', 'product') NOT NULL,
  owner_id INT UNSIGNED NOT NULL,
  url VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NOT NULL DEFAULT '',
  kind ENUM('image', 'video') NOT NULL DEFAULT 'image',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY media_owner (owner_type, owner_id)
);
