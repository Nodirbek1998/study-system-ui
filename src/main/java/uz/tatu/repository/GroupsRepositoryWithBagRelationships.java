package uz.tatu.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import uz.tatu.domain.Groups;

public interface GroupsRepositoryWithBagRelationships {
    Optional<Groups> fetchBagRelationships(Optional<Groups> groups);

    List<Groups> fetchBagRelationships(List<Groups> groups);

    Page<Groups> fetchBagRelationships(Page<Groups> groups);
}
