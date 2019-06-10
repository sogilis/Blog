---
title: "Under dir 1"
date: 2019-04-25T11:37:08.925Z
description: cela est un test pour savoir si les sous repertoires fonctionnents
---

```java
@Repository
public interface TrialRepository extends PagingAndSortingRepository<Trial, Long> {

    List<Trial> findByOperationOrderByIndex(Operation operation);

    @Query("select t from Trial \n"
            + "where index = (select max(index) from Trial where operation = :operation) \n"
            + "and operation = :operation")
    Trial findLastByOperation(@Param("operation") Operation operation);

    Trial findTopByOperationAndErrorDetailsIsNotNullOrderByIndexDesc(Operation operation);
}
```

This is a footnote.[^1]

[^1]: the footnote text.