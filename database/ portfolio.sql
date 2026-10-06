-- ============================================================
-- ELVIS CLAIN NYAGA - PROFESSIONAL PORTFOLIO
-- Database: elvis_portfolio
-- Database Engine: MariaDB
-- ============================================================


USE elvis_portfolio;


-- ============================================================
-- PROFILE TABLE
-- ============================================================

CREATE TABLE profile (
    id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(150) NOT NULL,
    professional_title VARCHAR(150) NOT NULL,
    short_bio TEXT,
    email VARCHAR(150),
    location VARCHAR(150),
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url VARCHAR(255),
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


-- ============================================================
-- SKILLS TABLE
-- ============================================================

CREATE TABLE skills (
    id INT NOT NULL AUTO_INCREMENT,
    skill_name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    proficiency_level VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


-- ============================================================
-- PROJECTS TABLE
-- ============================================================

CREATE TABLE projects (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    description TEXT,
    problem_statement TEXT,
    solution TEXT,
    technologies TEXT,
    features TEXT,
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    featured TINYINT(1) DEFAULT 0,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY unique_project_slug (slug)
);


-- ============================================================
-- CONTACT MESSAGES TABLE
-- ============================================================

CREATE TABLE contact_messages (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);