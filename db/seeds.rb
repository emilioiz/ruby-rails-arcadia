10.times do |i|
  User.create(email: "person#{i+1}@arcadiauser.com", password: 'password', password_confirmation: 'password')
end

User.all.each do |user|
  Faker::Config.locale = 'en-US'
  Profile.create(
    user: user,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    photo_url: "/jodoe.jpeg",
    phone1: Faker::PhoneNumber.cell_phone,
    phone2: Faker::PhoneNumber.cell_phone,
    notification_opt_in: Faker::Boolean.boolean(true_ratio: 0.2)
  )
end

Survey.create(name: "Sign up survey", is_active: true)

question = [
  "I am the...",
  "I have...",
  "Why are you intrested in fertility treatment?",
  "Does your insurance cover fertility?",
  "I want to learn about...",
  "What is your zipcode?",
  "What year were you"
]

question.each_with_index do |q, i|
  Question.create(
    survey_id: 1,
    name: question[i],
    is_active: true
  )
end

User.all.each do |u|
  Question.all.each_with_index do |q, i|
    responses = [
      [
        "Patient",
        "Partner"
      ],
      [
        "already started my treatment",
        "not started my treatment"
      ],
      [
        "I was referred by my OB/GYN",
        "Due to my medical history I'm seeking help",
        "Due to my age I'm seeking help",
        "I prefer not to say"
      ],
      [
        "Yes",
        "No"
      ],
      [
        "IVF",
        "IUI Natural",
        "Preservation",
        "Egg Freezing",
        "Egg Donation",
        "Surrogacy",
        "FET",
        "Donor Sprem",
        "Clomid",
        "Embryo Frezezing"
      ],
      [
        Faker::Address.zip
      ],
      [
        rand(1980..1990)
      ]
    ]
    Response.create(
      user: u,
      question: q,
      value: responses[i].sample
    )
  end
end

2.times do 
  User.all.each do |u|
    Prescription.create(
      user: u,
      name: Faker::ProgrammingLanguage.name
    )
  end
end

5.times do |i|
  User.all.each do |u|
    Faker::Config.locale = 'en-US'
    Contact.create(
      user: u,
      name: Faker::Company.name,
      phone1: Faker::PhoneNumber.cell_phone,
      phone2: Faker::PhoneNumber.phone_number,
      fax: Faker::PhoneNumber.phone_number,
      email: "contact#{i}_#{u.id}@arcadiacontact.com",
      address1: Faker::Address.street_name,
      city: Faker::Address.city,
      state:  Faker::Address.state_abbr,
      zipcode: Faker::Address.zip,
      country: Faker::Address.country,
      notes: Faker::Lorem.sentences
    )
  end
end

4.times do |i|
  Prescription.all.each do |pr|
    Event.create(
      user: pr.user,
      activity_date: Faker::Date.between(from: 2.days.from_now, to: 2.weeks.from_now),
      notes: Faker::Lorem.sentences,
      eventable_type: 'Prescription',
      eventable_id: pr.id
    )
  end
end

2.times do |i|
  Contact.all.each do |c|
    Event.create(
      user: c.user,
      activity_date: Faker::Date.between(from: 2.weeks.from_now, to: 2.months.from_now),
      notes: Faker::Lorem.sentences,
      eventable_type: 'Contact',
      eventable_id: c.id
    )
  end
end

puts "Created #{User.count} users and #{Profile.count} profiles."
puts "Created #{Survey.count} survey with #{Question.count} question. "
puts "Created #{Response.count} responses."
puts "Created #{Prescription.count} prescriptions and #{Contact.count} contacts."
puts "Create #{Event.count} total events."
