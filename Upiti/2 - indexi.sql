//users_recommended_view----------------------------------

db.getCollection('users_recommended_view').createIndex(
  {
      "username": 1
  },
  {
      name: "idx_username",
      unique: true
  }
)

//users_search_view----------------------------------

db.getCollection('users_search_view').createIndex(
  {
      "username": 1
  },
  {
      name: "idx_username",
      unique: true
  }
)

db.getCollection('users_search_view').createIndex(
  {
      "location": 1
  },
  {
      name: "idx_location",
      unique: false
  }
)

db.getCollection('users_search_view').createIndex(
  {
      "fullName": 1
  },
  {
      collation:
      {
          locale: 'en_US',
          strength: 2,
          
      },
      name: "idx_fullName_caseIns",
      unique: false
  }
)

//users_visit_profile_view----------------------------------
db.getCollection('users_visit_profile_view').createIndex(
  {
      "username": 1
  },
  {
      name: "idx_username",
      unique: true
  }
)

//users_algorithm_view----------------------------------
db.getCollection('users_algorithm_view').createIndex(
  {
      "username": 1
  },
  {
      name: "idx_username",
      unique: true
  }
)

db.getCollection('users_algorithm_view').createIndex(
  {
      "location": 1
  },
  {
      name: "idx_location",
      unique: false
  }
)

//users_credentials_view----------------------------------
db.getCollection('users_credentials_view').createIndex(
  {
      "username": 1
  },
  {
      name: "idx_username",
      unique: true
  }
)

//users_relationships_view----------------------------------
db.getCollection('users_relationships_view').createIndex(
  {
      "username": 1
  },
  {
      name: "idx_username",
      unique: true
  }
)