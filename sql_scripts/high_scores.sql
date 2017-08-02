DROP TABLE IF EXISTS high_scores;

CREATE TABLE high_scores
(   
    score_id int(4) NOT NULL AUTO_INCREMENT,
    scorer varchar (20) NOT NULL,
    game varchar (20) NOT NULL,
    point_score integer (4),
    time_score decimal (5,2),
    PRIMARY KEY (score_id)
);

