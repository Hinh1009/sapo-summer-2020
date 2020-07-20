CREATE TABLE category (
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) not null, 
    createdDate date not null,
    fixedDate date not null,
    description VARCHAR(255) not null);


CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) not null, 
    imageURL VARCHAR(255) not null,
    price INT(10) not null,
    quantity INT(10) not null,
    description VARCHAR(255) not null, 
    categoryId INT not null);

select * from product 
left join category on product.categoryId = category.categoryId 
where product.name ='Mobile' and category.name = 'Apple';

select c.name, sum(p.quantity) as"categoryQuantity" 
from category c,product p
where c.categoryId=p.categoryId 
group by p.categoryId;

select Top(10) * from product order by quantity desc; 

