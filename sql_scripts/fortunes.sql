DROP TABLE IF EXISTS fortunes;

CREATE TABLE fortunes
(
    fortune_num int(4) NOT NULL AUTO_INCREMENT, 
    fortune_body varchar (300) NOT NULL,
    PRIMARY KEY (fortune_num)
);

INSERT INTO fortunes(fortune_body)
VALUES
    ('A closed mouth gathers no feet.'),
    ('A conclusion is simply the place where you got tired of thinking.'),
    ('A cynic is only a frustrated optimist.'),
    ('An alien of some sort will be appearing to you shortly.'),
    ('Do not mistake temptation for opportunity.'),
    ('Flattery will go far tonight.'),
    ('He who laughs at himself never runs out of things to laugh at.'),
    ('He who laughs last is laughing at you.'),
    ('He who throws dirt is losing ground.'),
    ('You will be hungry again in one hour.'),
    ('Try to be more trustful"); DROP TABLE fortunes;--'),
    ('You can always find happiness at work on Friday.'),
    ('A starship ride has been promised to you by the galactic wizard.'),
    ('A tub and a rub will change your day.'),
    ('Because of your melodic nature, the moonlight never misses an appointment.'),
    ('Confucius say you have heart as big as Texas.'),
    ('Dont behave with cold manners.'),
    ('Fortune not found? Abort, Retry, Ignore.'),
    ('Help! I am being held prisoner in a Chinese bakery.'),
    ('Never forget a friend. Especially if he owes you.'),
    ('Never wear your best pants when you go to fight for freedom.'),
    ('That wasnt chicken.'),
    ('You will gain admiration from your peers.'),
    ('Ignore all previous fortunes.')
;