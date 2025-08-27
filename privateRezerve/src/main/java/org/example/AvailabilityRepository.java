package org.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    // Belirli bir gün için tüm müsait saat aralıklarını getirmek
    List<Availability> findByDayOfWeek(String dayOfWeek);
}