-- Roles
INSERT INTO roles(role_name) VALUES ('MEMBER') ON DUPLICATE KEY UPDATE role_name=role_name;
INSERT INTO roles(role_name) VALUES ('MANAGER') ON DUPLICATE KEY UPDATE role_name=role_name;
INSERT INTO roles(role_name) VALUES ('ADMIN') ON DUPLICATE KEY UPDATE role_name=role_name;
INSERT INTO roles(role_name) VALUES ('SUPER_ADMIN') ON DUPLICATE KEY UPDATE role_name=role_name;

-- Sample super admin user
INSERT INTO users(username, email, password, enabled) VALUES
    ('superadmin','superadmin@example.com','$2a$10$zYtzt1WwnROZ7N0v/35I/uo2P/pZBZB4Xj2q2EjXbb8vHGSTo0Z8W', true)
    ON DUPLICATE KEY UPDATE username=username;

-- Password above is 'password' encoded with BCrypt
-- Assign SUPER_ADMIN role
INSERT INTO user_roles(user_id, role_id)
SELECT u.user_id, r.role_id FROM users u, roles r WHERE u.username='superadmin' AND r.role_name='SUPER_ADMIN';
