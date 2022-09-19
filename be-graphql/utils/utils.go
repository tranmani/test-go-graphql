package utils

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"test-go-graphql/graph/model"
)

func GetUserByID(id string) (*model.User, error) {
	var user model.User

	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.Table("test").First(&user, "ID = ?", id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
