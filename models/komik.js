const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        },
        penulis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageType: DataTypes.STRING,
        imageName: DataTypes.STRING,
        imageData: DataTypes.BLOB('long'),
    }, {
        tableName : 'Komik',
        timestamps: true,
        freezeTableName: true
    });
    return Komik;
}