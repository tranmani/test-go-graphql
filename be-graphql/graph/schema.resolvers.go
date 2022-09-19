package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"test-go-graphql/graph/generated"
	"test-go-graphql/graph/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.Table("test").Create(input).Error
	if err != nil {
		return nil, err
	}

	user := &model.User{
		Name: input.Name,
	}

	return user, nil
}

// Update user
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UserInput) (*model.User, error) {
	_, err := GetUserByID(input.ID)
	if err != nil {
		return nil, err
	}

	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.Table("test").Updates(&input).Error
	if err != nil {
		return nil, err
	}

	newUser, _ := GetUserByID(input.ID)
	return newUser, nil
}

// Update user
func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (*model.User, error) {
	user, err := GetUserByID(id)
	if err != nil {
		return nil, err
	}

	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	err = db.Table("test").Delete(&user).Error
	if err != nil {
		return nil, err
	}

	return user, nil
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User

	db, err := gorm.Open(sqlite.Open("../test.db"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	db.Table("test").Select("*").Scan(&users)

	return users, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }