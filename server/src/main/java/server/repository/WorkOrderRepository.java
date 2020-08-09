package server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import server.entity.WorkOrder;

import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Integer> {

    @Query("select wk from WorkOrder wk join wk.client c where upper(c.name) like upper(:name) and MONTH(wk.date) =:month")
    List<WorkOrder> findbyNameAndMonth(@Param("name") String name, @Param("month") Integer month);
    
}
