package connection;

import java.sql.SQLException;

import orm.database.connection.DatabaseConnection;
import orm.database.connection.PostgresConnection;

public class DBAccess extends PostgresConnection {

    public DBAccess() {
    }

    public DBAccess(String url, String user, String password) throws SQLException {
        super(url, user, password);
    }

    @Override
    public DatabaseConnection defaultConnection() throws SQLException {
        return new DBAccess("jdbc:postgresql://localhost:5432/digital_property", "w41k4z", "w41k4z!");
    }

}
