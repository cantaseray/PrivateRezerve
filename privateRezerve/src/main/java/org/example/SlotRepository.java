package org.example;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    // Belirli bir işletmeye ait slotları getirir
    List<Slot> findByBusinessId(Long businessId);
}